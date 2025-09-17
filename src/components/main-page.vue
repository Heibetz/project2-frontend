<script setup>
// No backend yet, so we use a static list
const courses = [
  { code: 'BIBL-1013', name: 'Biblical Literature I', credits: 3 },
  { code: 'COMP-2013', name: 'Introduction to Programming', credits: 3 },
  { code: 'MATH-1513', name: 'College Algebra', credits: 3 },
  { code: 'ENGL-1113', name: 'English Composition I', credits: 3 },
  { code: 'HIST-2223', name: 'United States History', credits: 3 },
]
</script>

<template>
  <div class="oc-header">
    <h1>Oklahoma Christian University</h1>
    <h2>Course Catalog</h2>
  </div>
  <div class="oc-course-list">
    <table>
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Credits</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.code">
          <td>{{ course.code }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.credits }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

