<script setup>
import { useRoute } from 'vitepress';


const route = useRoute()
</script>

<template lang='pug'>
.flex.flex-wrap.gap-0.links.items-center.justify-center.bg-light-900.dark-bg-dark-800.bg-opacity-80.dark-bg-opacity-60.backdrop-blur-6.pb-2
  a.flex.items-center.gap-2(
    href="/"
    style="flex:1 1 280px"
    :class="{active:route.path=='/'}")  
    img.w-6(
      src="/logo.svg"
      )
    .p Chromatone Academy
  a(href="/programs/" :class="{active:route.path.includes('programs')}") Programs
  a(href="/projects/" :class="{active:route.path.includes('projects')}") Projects
  a(href="/events/" :class="{active:route.path.includes('events')}") Events
  a(href="/tutors/" :class="{active:route.path.includes('tutors')}") Tutors
  a(href="/partners/" :class="{active:route.path.includes('partners')}") Partners
  a(href="/about/" :class="{active:route.path.includes('about')}") About

</template>

<style scoped lang="postcss">
a {
  @apply flex justify-center items-center flex-auto p-4 text-xl hover-bg-light-700 hover-dark-bg-dark-800 transition text-center;
  flex: 1 1 80px;

  &.active {
    @apply font-bold
  }
}
</style>