<script setup>
import { ref, onMounted } from 'vue';
import hereApiKey from '../utils/here';

/**@type {import('vue').Ref<HTMLDivElement>} */
const mapRef = ref(null);

onMounted(() => {
    const platform = new H.service.Platform({
        apiKey: hereApiKey
    });

    const layers = platform.createDefaultLayers();

    new H.Map(
        mapRef.value,
        layers.vector.normal.map,
        {
            zoom: 10,
            center: {
                lat: 52.5,
                lng: 13.4
            }
        }
    );
});
</script>

<template>
    <div ref="mapRef" style="width: 100%; height: 100%;" />
</template>
