<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import { elastic } from 'boot/axios';
import { times, random } from 'lodash-es';
import { colors, useQuasar, QBtn } from 'quasar';
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
            label: 'Casos de síndrome gripal',
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

    for (const index of order) {
        const state = states[index];

        elastic.get(`/${state.acronym.toLowerCase()}/_count`)
            .then(response => response.data.count)
            .then(count => {
                requestAnimationFrame(
                    () => data.datasets[0].data[index] = count
                );

                const formatted = Intl.NumberFormat().format(count);

                circles.push({
                    radius: Math.log2(count / 5000) * 10000,
                    ...state.position,
                    onPointerenter() {
                        Object.assign(bubble, {
                            lat: state.position.lat + 1,
                            lng: state.position.lng,
                            text: `${state.name}: ${formatted} casos`,
                            open: true
                        });
                    },
                    onPointerleave() {
                        bubble.open = false;
                    },
                    /**@param {Event} e */
                    onTap(e) {
                        /**@type {H.Map} */
                        const map = e.target.getMap();

                        const {
                            clientX: x, clientY: y
                        } = e.originalEvent;

                        const increment = isDesktop.value
                            ? 0.2 * window.innerWidth
                            : 0;

                        const position = map.screenToGeo(
                            x - increment, y
                        );

                        map.setCenter(position, true);
                    }
                });
            });
    }
});

const showChart = ref(false);
</script>

<template>
    <q-page class="main">
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
        <div class="chart" :class="{ show: showChart }">
            <q-btn
                icon="mdi-chevron-left" flat round dense class="toggle"
                :ripple="false"
                @click="showChart = !showChart"
            />
            <Chart type="bar" :data="data" :options="options" />
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
        transform: initial;

        padding: 20pt 10pt;
        z-index: initial;
        width: 40%;
        box-shadow: 5px 0 px -3px black;
        background: rgba($water-color, .75);

        .toggle {
            display: none;
        }
    }
}
</style>
