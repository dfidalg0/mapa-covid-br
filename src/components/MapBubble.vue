<script setup>
import { onUnmounted, watchEffect } from 'vue';
import { useHere } from 'utils/here';
import { pick } from 'lodash-es';

const props = defineProps({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    open: {
        type: Boolean,
        default: true
    },
    text: {
        type: String
    }
});

const { ui } = useHere();

const bubble = new H.ui.InfoBubble(pick(props, 'lat', 'lng'));

ui.addBubble(bubble);

watchEffect(() => {
    bubble.setPosition(pick(props, 'lat', 'lng'));
});

watchEffect(() => {
    const state = props.open ? 'OPEN' : 'CLOSED';

    bubble.setState(H.ui.InfoBubble.State[state]);
});

const element = bubble.getElement();

element.querySelector('.H_ib_close').remove();

element.classList.add('h-map-bubble');

const content = bubble.getContentElement();

content.innerText = '';

content.classList.add('h-map-bubble__content');

onUnmounted(() => {
    ui.removeBubble(bubble);
    bubble.dispose();
});
</script>

<template>
    <teleport v-if="$slots.default || text" :to="content">
        <slot>
            {{ text }}
        </slot>
    </teleport>
</template>

<style lang="scss">
.h-map-bubble {
    min-width: fit-content;
    white-space: nowrap;

    &__content {
        margin: 15px;
        min-width: 20ch;
    }
}
</style>
