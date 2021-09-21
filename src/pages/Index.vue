<script setup>
import { reactive, onMounted } from 'vue';
import Chart from 'components/Chart.vue';
import states from 'utils/states';
import { elastic } from 'boot/axios';
import { times, random } from 'lodash-es';
import { colors } from 'quasar';
import Map from 'components/Map.vue';
import MapCircle from 'src/components/MapCircle';
import { platform } from 'utils/here';

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
            )
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
            suggestedMax: 30_000_000
        }
    },
    maintainAspectRatio: false,
    barPercentage: .85
};

const circles = reactive([]);

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

                platform.getSearchService().geocode({
                    qq: `country=BR;state=${state.acronym}`,
                    limit: 1
                }, ({ items }) => {
                    const result = items[0];

                    circles.push({
                        radius: Math.log2(count / 5000) * 10000,
                        ...result.position,
                    });
                });
            });
    }
});
</script>

<template>
    <q-page class="row">
        <div class="col-12 col-md-6 flex-center column q-pa-lg">
            <Map>
                <map-circle
                    v-for="circle in circles"
                    :key="1000 * circle.lat + circle.lng"
                    v-bind="circle"
                />
            </Map>
        </div>
        <div class="col-12 col-md-6 flex-center column q-pa-lg">
            <Chart type="bar" :data="data" :options="options" />
        </div>
    </q-page>
</template>

<style scoped lang="scss">
.column {
    min-height: calc(100vh - #{$toolbar-min-height});
}
</style>
