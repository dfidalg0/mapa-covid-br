<script setup>
import { debounce } from 'quasar';
import { ref, onMounted } from 'vue';
import hereApiKey from 'utils/here';

/**@type {import('vue').Ref<HTMLDivElement>} */
const mapRef = ref(null);

onMounted(() => {
    const platform = new H.service.Platform({
        apikey: hereApiKey
    });

    const layers = platform.createDefaultLayers();

    const map = new H.Map(
        mapRef.value,
        layers.vector.normal.map,
        {
            zoom: 4.5,
            center: {
                lat: -15.3442108,
                lng: -52.4579526
            }
        }
    );

    H.ui.UI.createDefault(map, layers, 'pt-BR');

    const events = new H.mapevents.MapEvents(map);

    new H.mapevents.Behavior(events);

    new ResizeObserver(debounce(() => {
        map.getViewPort().resize();
    }, 50)).observe(mapRef.value.parentElement);
});
</script>

<template>
    <div ref="mapRef" class="map" />
</template>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;
    box-sizing: initial;
}
</style>
