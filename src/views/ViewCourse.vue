<template>
  <div v-if="open" style="position:fixed; inset:0; z-index:9999;">
    <!-- backdrop -->
    <div
      style="position:absolute; inset:0; background:rgba(0,0,0,0.35);"
      @click="$emit('close')"
    ></div>

    <!-- slide-over panel -->
    <aside
      style="position:absolute; right:0; top:0; height:100vh; width:420px; background:#fff;
             box-shadow:0 20px 50px rgba(0,0,0,.35); padding:24px; overflow:auto;"
    >
      <header style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
        <h2 style="font-size:18px; font-weight:600; margin:0;">Course Details</h2>
        <button style="padding:4px 8px; border-radius:6px; border:1px solid #ddd; background:#f7f7f7;"
                @click="$emit('close')">✕</button>
      </header>

      <!-- Content -->

      <div v-if="loading">Loading…</div>
      <div v-else-if="error" style="color:#b00020">{{ error }}</div>

      <div v-else-if="course">
        <div style="display:grid; row-gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Department</div>
            <div>{{ course.dept }}</div>
          </div>

          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Course Number</div>
            <div>{{ course.courseNumber }}</div>
          </div>

          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Name</div>
            <div>{{ course.name }}</div>
          </div>

          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Hours</div>
            <div>{{ course.hours }}</div>
          </div>

          <div>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Level</div>
            <div>{{ course.level }}</div>
          </div>

          <div v-if="course.description && course.description.trim()">
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Description</div>
            <div style="white-space:pre-wrap">{{ course.description }}</div>
          </div>

          <div v-else>
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Description</div>
            <div>— No description provided —</div>
          </div>


          <!-- Optional: timestamps -->
          <div v-if="course.created_at">
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Created</div>
            <div>{{ new Date(course.created_at).toLocaleString() }}</div>
          </div>
          <div v-if="course.updated_at">
            <div style="font-size:11px; text-transform:uppercase; color:#777;">Updated</div>
            <div>{{ new Date(course.updated_at).toLocaleString() }}</div>
          </div>
        </div>

        <div style="margin-top:16px; display:flex; gap:12px;">

          <button
            style="padding:8px 12px; border-radius:6px; border:1px solid #ddd;"
            @click="$emit('close')"
          >Close</button>
        </div>
      </div>

      <div v-else>No course found.</div>
    </aside>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import http from '../services/http' // axios instance with baseURL '/api'

const props = defineProps({
  open: { type: Boolean, default: false },
  courseId: { type: [String, Number], default: null } // numeric id expected by backend route /courses/:id
})
defineEmits(['close', 'edit'])

const loading = ref(false)
const error = ref('')
const course = ref(null)

async function loadCourse(id) {
  if (id === null || id === undefined || id === '') return
  loading.value = true
  error.value = ''
  course.value = null
  try {
    const pathId = encodeURIComponent(String(id))
    console.log('[ViewCourse] GET /courses/' + pathId)
    const { data } = await http.get(`/courses/${pathId}`)
    console.log('[ViewCourse] payload:', data)
    course.value = data            // controller returns the row directly
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load course.'
  } finally {
    loading.value = false
  }
}

watch(() => props.open, (o) => { if (o) loadCourse(props.courseId) })
watch(() => props.courseId, (id) => { if (props.open) loadCourse(id) })
</script>
