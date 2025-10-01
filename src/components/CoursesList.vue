<template>
  <div>
    <header class="oc-header">
      <h1>Course Catalog</h1>
      <h2>Project 2</h2>
    </header>

    <section class="oc-course-list">
      <h3 style="margin-top:0; margin-bottom:1rem; text-align:left;">All Courses</h3>

      <table v-if="!loading && courses.length">
        <thead>
          <tr>
            <th>Dept</th>
            <th>Number</th>
            <th>Level</th>
            <th>Hours</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in courses" :key="c.id">
            <td>{{ c.dept }}</td>
            <td>{{ c.course_number }}</td>
            <td>{{ c.level }}</td>
            <td>{{ c.hours }}</td>
            <td>{{ c.name }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else-if="loading">Loading…</p>
      <p v-else>No courses found.</p>
    </section>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'CoursesList',
  data: () => ({ courses: [], loading: true, error: '' }),
  async mounted() {
    try {
      const { data } = await api.get('/courses')
      this.courses = data
    } catch (e) {
      this.error = e?.response?.data?.error?.detail || e.message
      console.error(e)
    } finally {
      this.loading = false
    }
  }
}
</script>
