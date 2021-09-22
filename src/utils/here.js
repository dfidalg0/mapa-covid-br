import { inject } from 'vue';

export const apiKey = 'b0DoGXbI_07hl2hPRNGyWthQB_Td4_6pxzWpeJj080E';

export const platform = new H.service.Platform({ apikey: apiKey });

export const events = [
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

export const useEvents = (obj, emit) => {
    for (const eventName of events) {
        obj.addEventListener(eventName, evt => {
            emit(eventName, evt);
        });
    }
};

/**
 * @typedef {Object} Here
 * @property {H.Map} map
 * @property {H.ui.UI} ui
 * @property {H.mapevents.MapEvents} events
 */

/**@type {import('vue').InjectionKey<() => Here>} */
export const MAP_KEY = Symbol('map-injection');

export function useHere() {
    const getHere = inject(MAP_KEY);

    return getHere();
}
