<script setup>
definePageMeta({ middleware: ["auth"] })

import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import { useDateFormat } from '@vueuse/core'

const route = useRoute()

// definePageMeta({ middleware: ["auth"] })

const { getItems } = useDirectusItems()
const { getThumbnail: img } = useDirectusFiles();

const { data: events, error } = await useAsyncData('event-' + route.params?.slug, async () => await getItems({
  collection: 'events',
  params: {
    filter: {
      slug: {
        _eq: route.params?.slug
      }
    },
    fields: ['*', 'project.title', 'project.slug', 'project.program.title', 'project.program.slug', 'project.program.color', 'place.title', 'place.url']
  }
}))

const p = computed(() => events.value?.[0])

useHead({
  title: p.value?.title,
  titleTemplate: '%s event'
})

const date = useDateFormat(() => p.value?.date, 'DD MMM YYYY')
</script>

<template lang='pug'>
.px-4.flex.flex-wrap.gap-4.items-start



  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(
      :to="`/programs/${p?.project?.program?.slug}/`") {{ p?.project?.program?.title }} 
      .flex-1
      .op-50 program

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(:to="`/projects/${p?.project?.slug}/`") {{ p?.project.title }}
      .flex-1
      .op-50 project

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="p?.cover"
      :src="p?.cover"
      width="600"
      )

    .glass.p-4.flex-col.flex.gap-4
      .flex.gap-2.flex-wrap.items-center
        .text-3xl {{ p?.title }}
        .flex-auto
        NuxtLink.op-50(to="/events/") event

      .text-xl.op-70 {{ date }} @ {{ p?.place?.title }}

      .text-lg {{ p?.description }}

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="p?.poster && p.poster != p?.cover"
      :src="p?.poster"
      width="400"
      )


  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    LiteYouTubeEmbed(
      title="Video" 
      :id="p?.youtube_video" 
      v-if="p?.youtube_video")

    .glass

      EventSchedule(:schedule="p?.schedule")

      MDC.prose.p-4(:value="p?.content || ''" tag="article")

    LiteYouTubeEmbed(
      title="Video" 
      :id="p?.live_stream" 
      v-if="p?.live_stream")

</template>