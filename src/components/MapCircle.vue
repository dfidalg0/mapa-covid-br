<script setup>
import { watchEffect, onBeforeUnmount } from 'vue';
import { pick } from 'lodash-es';
import { events, useEvents, useHere } from 'utils/here';

const props = defineProps({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    style: {
        type: Object,
    },
    visible: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(events);

const { map } = useHere();

const circle = new H.map.Circle(pick(props, 'lat', 'lng'), props.radius);

map.addObject(circle);

useEvents(circle, emit);

const mapElement = map.getElement();

circle.addEventListener('pointerenter', () => {
    mapElement.style.cursor = 'pointer';
});

circle.addEventListener('pointerleave', () => {
    mapElement.style.cursor = null;
});

circle.getMap = () => map;

watchEffect(() => {
    circle.setCenter(pick(props, 'lat', 'lng'));
    circle.setRadius(props.radius);
    circle.setStyle(props.style);
    circle.setVisibility(props.visible);
});

onBeforeUnmount(() => {
    map.removeObject(circle);
    circle.dispose();
});
</script>

<template />
