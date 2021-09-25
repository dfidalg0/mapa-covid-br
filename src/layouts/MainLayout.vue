<script setup>
import EssentialLink from 'components/EssentialLink.vue';
import { useQuasar } from 'quasar';
import {
    QLayout, QDrawer, QHeader,
    QToolbar, QToolbarTitle,
    QList, QItemLabel, QBtn,
    QPageContainer
} from 'quasar';
import {
    RouterView
} from 'vue-router';

const $q = useQuasar();

import { ref } from 'vue';

const links = [
    {
        title: 'Ministério da Saúde',
        caption: 'gov.br/saude/',
        icon: 'mdi-hospital-box-outline',
        link: 'https://www.gov.br/saude/pt-br'
    },
    {
        title: 'OpenDataSUS',
        caption: 'opendatasus.saude.gov.br',
        icon: 'mdi-chart-scatter-plot',
        link: 'https://opendatasus.saude.gov.br/'
    },
    {
        title: 'Portal Brasileiro de Dados',
        caption: 'dados.gov.br',
        icon: 'mdi-cube-outline',
        link: 'https://dados.gov.br'
    },
    {
        title: 'Código Fonte',
        caption: 'diegood12/mapa-covid-br',
        icon: 'mdi-github',
        link: 'https://github.com/diegood12/mapa-covid-br'
    },
];

const leftDrawerOpen = ref(false);
</script>

<template>
    <q-layout view="hHr LpR fff">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="mdi-menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <q-toolbar-title>
                    Mapa Covid BR
                </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            elevated
            behavior="mobile"
        >
            <q-list>
                <q-item-label
                    header
                >
                    Links auxiliares
                </q-item-label>

                <EssentialLink
                    v-for="link in links"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
