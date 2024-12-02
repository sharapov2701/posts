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

  function getPostById(postId: Post['id']): Post | undefined {
    return posts.value.find((post) => post.id === postId)
  }

  function editPost({ id: postId, ...postData }: Post): Post | undefined {
    const post = getPostById(postId)
    if (post) {
      Object.assign(post, postData)
    }
    return post
  }

  watch(posts, savePosts, { deep: true })

  onMounted(() => getPosts())

  return {
    posts,
    editPost,
  }
})
