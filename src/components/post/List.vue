<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { Post } from '@/types/post'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)

const searchField = useTemplateRef('searchField')

const page = ref<number>(1)
const search = ref<string>('')
const pageSize = ref<number>(10)

const reversedPosts = computed<Post[]>(() => posts.value.toReversed())

const filteredPosts = computed<Post[]>(() =>
  search.value
    ? reversedPosts.value.filter((post) =>
        post.name.toLowerCase().includes(search.value.toLowerCase()),
      )
    : reversedPosts.value,
)

const displayedPosts = computed<Post[]>(() =>
  filteredPosts.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value),
)

const pagesTotal = computed<number>(
  () => Math.floor(filteredPosts.value.length / pageSize.value) || 1,
)
</script>

<template>
  <v-card class="mx-auto h-100 d-flex flex-column" max-width="800">
    <v-toolbar color="blue">
      <v-toolbar-title>Посты</v-toolbar-title>

      <v-spacer />

      <v-text-field
        ref="searchField"
        v-model:model-value="search"
        class="mx-5"
        clearable
        hide-details
        label="Поиск"
        variant="solo"
        append-inner-icon="mdi-magnify"
      />
    </v-toolbar>

    <v-list class="flex-grow-1 overflow-y-auto" item-props lines="three" :items="displayedPosts">
      <template #subtitle="{ item: post }">
        <post :key="post.id" :post="post" />
      </template>
    </v-list>

    <v-pagination v-model="page" :length="pagesTotal" />
  </v-card>
</template>
