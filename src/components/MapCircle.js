import { inject, watchEffect, onBeforeUnmount, defineComponent } from 'vue';
import { MAP_KEY } from 'utils/keys';
import { pick } from 'lodash-es';

const emits = [
    'pointerdown',
    'pointerup',
    'pointermove',
    'pointerenter',
    'pointerleave',
    'pointercancel',
    'dragstart',
    'drag',
    'dragend',
    'tap',
    'dbltap',
    'longpress',
];

export default defineComponent({
    props: {
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
        }
    },
    emits,
    setup(props, { emit }) {
        const getMap = inject(MAP_KEY);

        const map = getMap();

        const circle = new H.map.Circle(pick(props, 'lat', 'lng'), props.radius);

        map.addObject(circle);

        for (const eventName of emits) {
            circle.addEventListener(eventName, evt => {
                emit(eventName, evt);
            });
        }

        watchEffect(() => {
            circle.setCenter(pick(props, 'lat', 'lng'));
            circle.setRadius(props.radius);
        });

        onBeforeUnmount(() => {
            map.removeObject(circle);
            circle.dispose();
        });

        return () => [];
    }
});
