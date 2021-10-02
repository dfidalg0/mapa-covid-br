<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import { elastic } from 'boot/axios';
import { times, random } from 'lodash-es';
import { colors, useQuasar, QBtn, debounce } from 'quasar';
import states from 'utils/states';
import Chart from 'components/Chart.vue';
import Map from 'components/Map.vue';
import MapCircle from 'components/MapCircle.vue';
import MapBubble from 'components/MapBubble.vue';

/**@type {import('chart.js').ChartData} */
const data = reactive({
    labels: states.map(state => state.name),
    datasets: [
        {
            label: 'Teste Positivo - COVID-19',
            data: states.map(() => 0),
            backgroundColor: colors.changeAlpha(
                colors.getPaletteColor('accent'),
                0.75
            ),
        },
        {
            label: 'Teste Negativo - COVID-19',
            data: states.map(() => 0),
            backgroundColor: colors.changeAlpha(
                colors.getPaletteColor('secondary'),
                0.75
            ),
        },
        {
            label: 'Total de Casos - Síndrome Gripal',
            data: states.map(() => 0),
            backgroundColor: colors.changeAlpha(
                colors.getPaletteColor('primary'),
                0.75
            ),
        }
    ],
});

const indexAxis = 'y';
const dataAxis = indexAxis === 'x' ? 'y' : 'x';

/**@type {import('chart.js').ChartOptions<'bar'>} */
const options = {
    indexAxis,
    scales: {
        [dataAxis]: {
            type: 'logarithmic',
            suggestedMax: 30_000_000,
            ticks: {
                color: 'black'
            }
        },
        [indexAxis]: {
            ticks: {
                color: 'black'
            }
        }
    },
    maintainAspectRatio: false,
    barPercentage: .85,
    color: 'black',
};

const circles = reactive([]);
const bubble = reactive({
    lat: 0,
    lng: 0,
    text: '',
    open: false
});

const $q = useQuasar();

const isDesktop = computed(() => $q.screen.gt.md);

onMounted(() => {
    const numbers = states.map((_, i) => i);

    const order = times(
        states.length,
        () => numbers.splice(random(0, numbers.length - 1), 1)[0]
    );

    const positive = [];
    const negative = [];

    const setGraph = debounce(() => {
        for (const i in positive) {
            data.datasets[0].data[i] = positive[i];
            data.datasets[1].data[i] = negative[i];
            data.datasets[2].data[i] = negative[i] + positive[i];
        }
    }, 100);

    for (const index of order) {
        const state = states[index];

        elastic.post(`/${state.acronym.toLowerCase()}/_search`, {
            size: 0,
            aggs: {
                positive: {
                    filter: {
                        match: {
                            resultadoTeste: 'Positivo'
                        }
                    }
                },
                negative: {
                    filter: {
                        match: {
                            resultadoTeste: 'Negativo'
                        }
                    }
                }
            }
        })
            .then(response => response.data.aggregations)
            .then(aggs => {
                positive[index] = aggs.positive.doc_count;
                negative[index] = aggs.negative.doc_count;

                setGraph();

                const count = positive[index] + negative[index];

                const strokeColor = colors.getPaletteColor('primary');
                const { r, g, b } = colors.hexToRgb(strokeColor);
                const fillColor = `rgba(${r},${g},${b},0.5)`;

                circles.push({
                    radius: Math.log2(count / 5000) * 10000,
                    style: {
                        fillColor, strokeColor
                    },
                    ...state.position,
                    onPointerenter(e) {
                        /**@type {H.Map} */
                        const map = e.target.getMap();

                        const { offsetX: x, offsetY: y } = e.originalEvent;

                        const { lat, lng } = map.screenToGeo(x, y - 10);

                        const { format } = Intl.NumberFormat();

                        const total = format(count);
                        const confirmed = format(positive[index]);

                        Object.assign(bubble, {
                            lat, lng,
                            text: `${state.name}: ${total} casos - ${confirmed} confirmados`,
                            open: true
                        });
                    },
                    onPointermove(e) {
                        /**@type {H.Map} */
                        const map = e.target.getMap();

                        const { offsetX: x, offsetY: y } = e.originalEvent;

                        const { lat, lng } = map.screenToGeo(x, y - 10);

                        bubble.lat = lat;
                        bubble.lng = lng;
                    },
                    onPointerleave() {
                        bubble.open = false;
                    },
                    /**@param {Event} e */
                    onTap(e) {
                        /**@type {H.Map} */
                        const map = e.target.getMap();

                        const { x, y } = map.geoToScreen(state.position);

                        const position = map.screenToGeo(x, y);

                        map.getViewModel().setLookAtData({
                            position,
                            zoom: 5.9,
                            tilt: 0,
                            heading: 180,
                            incline: 0
                        }, true);
                    }
                });
            });
    }
});

const showChart = ref(false);

if (isDesktop.value) {
    setTimeout(() => showChart.value = true, 0);
}
</script>

<template>
    <q-page class="main">
        <div class="chart" :class="{ show: showChart }">
            <q-btn
                icon="mdi-chevron-left" flat round dense class="toggle"
                :ripple="false"
                @click="showChart = !showChart"
            />
            <Chart type="bar" :data="data" :options="options" />
        </div>
        <div class="map-container">
            <Map>
                <map-circle
                    v-for="circle in circles"
                    :key="1000 * circle.lat + circle.lng"
                    v-bind="circle"
                />
                <map-bubble
                    v-bind="bubble"
                />
            </Map>
        </div>
    </q-page>
</template>

<style scoped lang="scss">
$water-color: #9acdfa;

.main {
    height: calc(100vh - #{$toolbar-min-height});
    width: 100vw;
    position: relative;
}

.map-container {
    width: 100%;
    height: 100%;
}

.chart {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba($water-color, .85);
    z-index: 10;
    padding: 10pt 0;

    transition: transform .3s ease;

    transform: translateX(-100%);

    &.show {
        transform: translateX(0);
        .toggle {
            transform: initial;
        }
    }

    .toggle {
        position: absolute;
        right: 5pt;
        top: 5pt;
        transition: transform .3s ease;
        transform:
            translateX(calc(100% + 2 * 5pt))
            rotate(-180deg);
    }

    @include md {
        padding: 20pt 10pt;
        width: 40%;
        max-width: 400pt;
        box-shadow: 5px 0 px -3px black;
        background: rgba($water-color, .75);
    }
}
</style>
