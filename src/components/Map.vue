<script setup>
import { debounce, useQuasar } from 'quasar';
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { platform, MAP_KEY } from 'utils/here';

/**@type {import('vue').Ref<HTMLDivElement>} */
const container = ref();

const layers = platform.createDefaultLayers({
    lg: 'pt-BR'
});

/**@type {H.Map} */ let map;
/**@type {H.ui.UI} */ let ui;
/**@type {H.mapevents.MapEvents} */ let events;
/**@type {ResizeObserver} */ let observer;

const mounted = ref(false);

provide(MAP_KEY, () => ({ map, ui, events }));

const $q = useQuasar();

onMounted(() => {
    mounted.value = true;

    const isDesktop = $q.screen.gt.md;

    /**@type {H.Map.Options} */
    const mapOptions = {
        zoom: isDesktop ? 4.9 : 3.5,
        center: {
            lat: -15.3442108,
            lng: -54.4579526,
        }
    };

    map = new H.Map(container.value, layers.vector.normal.map, mapOptions);

    ui = H.ui.UI.createDefault(map, layers, 'pt-BR');

    events = new H.mapevents.MapEvents(map);

    new H.mapevents.Behavior(events);

    observer = new ResizeObserver(debounce(() => {
        map.getViewPort().resize();
    }, 50));

    observer.observe(container.value.parentElement);
});

onUnmounted(() => {
    ui.dispose();
    events.dispose();
    map.dispose();
    observer.disconnect();
});
</script>

<template>
    <div ref="container" class="map">
        <slot v-if="mounted" />
    </div>
</template>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;
    *, *::before, *::after {
        box-sizing: initial;
    }
}
</style>
