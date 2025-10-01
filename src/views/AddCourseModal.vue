<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save', 'close'])

const form = ref({
  dept: '',
  courseNumber: '',
  name: '',
  hours: '',
  level: ''
})

const errors = ref({})

function validate() {
  errors.value = {}
  if (!form.value.dept) errors.value.dept = 'Department is required.'
  if (!form.value.courseNumber) errors.value.courseNumber = 'Course Number is required.'
  if (!form.value.name) errors.value.name = 'Course Name is required.'
  if (!form.value.hours) errors.value.hours = 'Credit Hours are required.'
  if (!form.value.level) errors.value.level = 'Level is required.'
  return Object.keys(errors.value).length === 0
}

function save() {
  if (validate()) {
    emit('save', { ...form.value })
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal">
      <h3>Add New Course</h3>
      <form @submit.prevent="save">
        <div>
          <label>Department</label>
          <input v-model="form.dept" style="text-transform:uppercase" @input="form.dept = form.dept.toUpperCase()" />
          <span v-if="errors.dept" class="err">{{ errors.dept }}</span>
        </div>
        <div>
          <label>Course Number</label>
          <input v-model="form.courseNumber" style="text-transform:uppercase" @input="form.courseNumber = form.courseNumber.toUpperCase()" />
          <span v-if="errors.courseNumber" class="err">{{ errors.courseNumber }}</span>
        </div>
        <div>
          <label>Course Name</label>
          <input v-model="form.name" />
          <span v-if="errors.name" class="err">{{ errors.name }}</span>
        </div>
        <div>
          <label>Credit Hours</label>
          <input v-model="form.hours" type="number" min="0" />
          <span v-if="errors.hours" class="err">{{ errors.hours }}</span>
        </div>
        <div>
          <label>Level</label>
          <input v-model="form.level" />
          <span v-if="errors.level" class="err">{{ errors.level }}</span>
        </div>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" @click="emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  color: #111;
  padding: 2rem;
  border-radius: 8px;
  min-width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
input, label {
  color: #111;
}
input {
  background: #fff;
  border: 1px solid #bbb;
  padding: 0.4em 0.7em;
  border-radius: 4px;
  margin-top: 0.2em;
  margin-bottom: 0.5em;
  width: 100%;
  box-sizing: border-box;
}
.err { color: #b00020; font-size: 0.9em; }
.modal-actions { margin-top: 1em; display: flex; gap: 1em; }
</style>
