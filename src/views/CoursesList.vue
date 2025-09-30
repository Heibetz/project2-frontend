<script setup>
import { ref, onMounted, computed } from 'vue'
import http from '../services/http'

const courses = ref([])
const loading = ref(true)
const error = ref('')

// Explicit columns to display
const columnDefs = [
  { key: 'dept', label: 'Department' },
  { key: 'courseNumber', label: 'Course Number' },
  { key: 'name', label: 'Course Name' },
  { key: 'hours', label: 'Credit Hours' },
  { key: 'level', label: 'Level' },
]

onMounted(async () => {
  try {
    const { data } = await http.get('/courses')
    // Ensure it's an array; some APIs wrap in {items: []}
    courses.value = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : [])
  } catch (e) {
    error.value = e?.response?.data?.message || e?.message || 'Failed to load courses.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="oc-header">
      <h1>Oklahoma Christian University</h1>
      <h2>Course Catalog</h2>
    </div>

    <div class="oc-course-list">
      <div v-if="loading">Loading courses…</div>
      <div v-else-if="error" style="color:#b00020">{{ error }}</div>
      <template v-else>
        <table v-if="courses.length">
          <thead>
            <tr>
              <th v-for="col in columnDefs" :key="col.key">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, idx) in courses" :key="course.id ?? course.courseNumber ?? idx">
              <td>{{ course.dept }}</td>
              <td>{{ course.courseNumber }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.hours }}</td>
              <td>{{ course.level }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>No courses found.</div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Ensure large lists are scrollable within the card area */
.oc-course-list { max-height: 70vh; overflow: auto; }
</style>
