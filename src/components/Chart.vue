<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { Chart } from 'chart.js';

const props = defineProps({
    type: {
        required: true,
        /**@type {() => import('chart.js').ChartType} */
        type: String
    },
    data: {
        required: true,
        /**@type {() => import('chart.js').ChartData} */
        type: Object
    },
    /**@type {() => import('chart.js').Plugin[]} */
    plugins: Array,
    /**@type {() => import('chart.js').ChartOptions} */
    options: Object
});

/**@type {import('vue').Ref<HTMLCanvasElement>} */
const canvas = ref(null);

onMounted(() => {
    const chart = new Chart(
        canvas.value,
        {
            type: props.type,
            data: props.data,
            options: props.options,
            plugins: props.plugins
        }
    );

    watchEffect(() => {
        Object.assign(chart, props);
        chart.update();
    });
});
</script>

<template>
    <canvas ref="canvas" />
</template>
