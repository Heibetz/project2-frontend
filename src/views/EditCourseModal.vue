<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h2>Edit Course</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="dept">Department:</label>
          <input 
            type="text" 
            id="dept" 
            v-model="formData.dept" 
            required
            placeholder="Department"
          >
        </div>
        <div class="form-group">
          <label for="courseNumber">Course Number:</label>
          <input 
            type="text" 
            id="courseNumber" 
            v-model="formData.courseNumber" 
            required
            placeholder="Course Number"
          >
        </div>
        <div class="form-group">
          <label for="name">Course Name:</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required
            placeholder="Course Name"
          >
        </div>
        <div class="form-group">
          <label for="hours">Credit Hours:</label>
          <input 
            type="number" 
            id="hours" 
            v-model="formData.hours" 
            required
            min="0"
            max="12"
            placeholder="Credit Hours"
          >
        </div>
        <div class="form-group">
          <label for="level">Level:</label>
          <input 
            type="text" 
            id="level" 
            v-model="formData.level" 
            required
            placeholder="Course Level"
          >
        </div>
        <div class="button-group">
          <button type="submit" class="submit-btn">Update</button>
          <button type="button" class="cancel-btn" @click="handleCancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCourseModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        id: null,
        dept: '',
        courseNumber: '',
        name: '',
        hours: 0,
        level: ''
      }
    }
  },
  created() {
    // Initialize form data when component is created
    if (this.course) {
      this.formData = { ...this.course }
    }
  },
  watch: {
    course: {
      immediate: true,
      deep: true,
      handler(newCourse) {
        if (newCourse) {
          this.formData = {
            ...this.formData,
            ...newCourse,
            hours: typeof newCourse.hours === 'number' ? newCourse.hours : 0
          }
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData })
    },
    handleCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1.2em;
  border-radius: 8px;
  max-width: 350px;
  width: 80%;
}

h2 {
  margin-top: 0;
  margin-bottom: 0.8em;
  font-size: 1.5em;
  color: #2196f3;
}

.form-group {
  margin-bottom: 0.8em;
}

label {
  display: block;
  margin-bottom: 0.3em;
  color: #666;
  font-size: 0.9em;
}

input, textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  background-color: white;
  color: #000;
}

textarea {
  height: 60px;
  resize: vertical;
  background-color: white;
}

.button-group {
  display: flex;
  gap: 0.8em;
  margin-top: 1.2em;
}

.submit-btn, .cancel-btn {
  padding: 0.5em 2em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn {
  background: #2196f3;
  color: white;
}

.submit-btn:hover {
  background: #1976d2;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style>