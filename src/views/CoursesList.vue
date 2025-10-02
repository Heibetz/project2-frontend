<script setup>
import { ref, onMounted, computed } from 'vue'
import http from '../services/http'

import AddCourseModal from './AddCourseModal.vue'
import EditCourseModal from './EditCourseModal.vue'

const courses = ref([])
const loading = ref(true)
const error = ref('')

const showAddModal = ref(false)
const showEditModal = ref(false)
const courseToEdit = ref(null)

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

async function addCourse(course) {
  try {
    // Save to backend
    const { data } = await http.post('/courses', course)
    // Add to local list (assume backend returns the new course)
  courses.value.push(data)
    // Sort alphabetically by course number
    courses.value.sort((a, b) => {
      // If courseNumber is numeric, sort numerically, else string compare
      const aNum = Number(a.courseNumber)
      const bNum = Number(b.courseNumber)
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum
      }
      return String(a.courseNumber).localeCompare(String(b.courseNumber))
    })
  showAddModal.value = false
  } catch (e) {
    alert(e?.response?.data?.message || e?.message || 'Failed to add course.')
  }
}

async function deleteCourse(id) {
  if (!confirm('Are you sure you want to delete this course?')) return
  
  try {
    await http.delete(`/courses/${id}`)
    courses.value = courses.value.filter(c => c.id !== id)
  } catch (e) {
    alert(e?.response?.data?.message || e?.message || 'Failed to delete course.')
  }
}

function openEditModal(course) {
  courseToEdit.value = { ...course }
  showEditModal.value = true
}

async function updateCourse(updatedCourse) {
  try {
    const response = await http.put(`/courses/${updatedCourse.id}`, updatedCourse)
    if (response.data) {
      // Update the course in the local list
      const index = courses.value.findIndex(c => c.id === updatedCourse.id)
      if (index !== -1) {
        courses.value[index] = response.data
      }
      showEditModal.value = false
    }
  } catch (e) {
    // Only show alert for actual errors (not 404 responses)
    if (e?.response?.status !== 404) {
      alert(e?.message || 'Failed to update course.')
    }
  }
}
</script>

<template>
  <div>
    <div class="oc-header">
      <h1>Oklahoma Christian University</h1>
      <h2>Course Catalog</h2>
    </div>

    <button class="add-btn" @click="showAddModal = true">Add Course</button>

    <div class="oc-course-list">
      <div v-if="loading">Loading courses…</div>
      <div v-else-if="error" style="color:#b00020">{{ error }}</div>
      <template v-else>
        <table v-if="courses.length">
          <thead>
            <tr>
              <th v-for="col in columnDefs" :key="col.key">{{ col.label }}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, idx) in courses" :key="course.id ?? course.courseNumber ?? idx">
              <td>{{ course.dept }}</td>
              <td>{{ course.courseNumber }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.hours }}</td>
              <td>{{ course.level }}</td>
              <td class="actions">
                <button class="edit-btn" @click="openEditModal(course)">Edit</button>
                <button class="delete-btn" @click="deleteCourse(course.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No courses found.</div>
      </template>
    </div>

    <AddCourseModal v-if="showAddModal" @save="addCourse" @close="showAddModal = false" />
    <EditCourseModal 
      v-if="showEditModal" 
      :show="showEditModal"
      :course="courseToEdit"
      @submit="updateCourse"
      @close="showEditModal = false"
    />
  </div>
</template>

<style scoped>
/* Ensure large lists are scrollable within the card area */
.oc-course-list { max-height: 70vh; overflow: auto; }

.add-btn {
  margin: 1em 0;
  padding: 0.5em 1.5em;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #1565c0;
}

.actions {
  display: flex;
  gap: 0.5em;
}

.edit-btn, .delete-btn {
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  color: white;
  font-size: 1em;
}

.edit-btn {
  background: #1976d2;
}

.edit-btn:hover {
  background: #1565c0;
}

.delete-btn {
  background: #f44336;
}

.delete-btn:hover {
  background: #d32f2f;
}
</style>
