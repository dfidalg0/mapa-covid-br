<script setup>
import { debounce } from 'quasar';
import { ref, onMounted, provide, toRaw } from 'vue';
import { MAP_KEY } from 'utils/keys';
import { platform } from 'utils/here';

/**@type {import('vue').Ref<HTMLDivElement>} */
const container = ref();

const layers = platform.createDefaultLayers();

/**@type {import('vue').Ref<H.Map>} */
const mapRef = ref();

provide(MAP_KEY, () => toRaw(mapRef.value));

onMounted(() => {
    const map = mapRef.value = new H.Map(
        container.value,
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
    }, 50)).observe(container.value.parentElement);

    // platform.getSearchService().geocode({
    //     qq: 'country=BR;state=PI',
    //     limit: 1
    // }, result => {
    //     const state = result.items[0];

    //     console.log(state.position);

    //     const circle = new H.map.Circle(state.position, 10000);
    //     map.addObject(circle);
    //     console.log(result);
    // });
});
</script>

<template>
    <div ref="container" class="map">
        <slot v-if="mapRef" />
    </div>
</template>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;
    box-sizing: initial;
}
</style>
