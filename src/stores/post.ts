import { defineStore } from 'pinia'

import data from '@/assets/data.json'
import type { Post } from '@/types/post'
import { LocalStorage } from '@/constants/localStorage'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])

  function getPosts(): Post[] {
    const savedPosts = localStorage.getItem(LocalStorage.Posts)

    if (savedPosts) {
      posts.value = JSON.parse(savedPosts)
    } else {
      posts.value = data.posts
    }

    return posts.value
  }

  function savePosts(posts: Post[]) {
    localStorage.setItem(LocalStorage.Posts, JSON.stringify(posts))
  }

  watch(posts, savePosts)

  onMounted(() => getPosts())

  return {
    posts,
  }
})
