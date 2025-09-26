<template>
  <div>
    <header class="oc-header">
      <h1>OCU Courses</h1>
      <h2>Browse offerings by department</h2>
    </header>

    <section class="oc-course-list">
      <CoursesList />
    </section>
  </div>
</template>

<script>
import CoursesList from './components/CoursesList.vue'
export default { components: { CoursesList } }
</script>
