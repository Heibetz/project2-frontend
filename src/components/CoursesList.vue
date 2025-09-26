<template>
  <div>
    <table v-if="courses.length">
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
          <td>{{ c['course_number'] }}</td>
          <td>{{ c.level }}</td>
          <td>{{ c.hours }}</td>
          <td>{{ c.name }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Loading…</p>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'CoursesList',
  data: () => ({ courses: [] }),
  async mounted() {
    try {
      const { data } = await api.get('/courses')
      this.courses = data
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
