<template>
  <v-card class="mx-auto" max-width="800">
    <v-toolbar>
      <v-toolbar-title>Посты</v-toolbar-title>

      <v-spacer />

      <v-text-field
        v-if="isSearchDisplayed"
        ref="searchField"
        v-model:model-value="search"
        class="mx-2"
        clearable
        hide-details
        variant="solo"
      />

      <v-btn icon="mdi-magnify" variant="text" @click="toggleSearch" />
    </v-toolbar>

    <v-list :items="displayedPosts" lines="three" item-props>
      <template #subtitle="{ item }">
        {{ item.name }}
      </template>
    </v-list>

    <v-pagination v-model="page" :length="pagesTotal" />
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)

const searchField = useTemplateRef('searchField')

const page = ref<number>(1)
const search = ref<string>('')
const pageSize = ref<number>(10)
const isSearchDisplayed = ref<boolean>(false)

const filteredPosts = computed(() =>
  search.value
    ? posts.value.filter((post) => post.name.toLowerCase().includes(search.value.toLowerCase()))
    : posts.value,
)

const displayedPosts = computed(() =>
  filteredPosts.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value),
)

const pagesTotal = computed(() => Math.floor(displayedPosts.value.length / pageSize.value) || 1)

function showSearch() {
  isSearchDisplayed.value = true
  nextTick(() => searchField.value.focus())
}

function hideSearch() {
  isSearchDisplayed.value = false
}

function toggleSearch() {
  isSearchDisplayed.value ? hideSearch() : showSearch()
}
</script>
