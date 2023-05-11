<template>
    <ul>
			<li v-for="task in tasks" :class="{ 'strike': task.done }" @click="task.done = !task.done">
				{{ task.body }}
			</li>
		</ul>
    <div class="cont">
			<div class="child" v-for="d in dates" :class="{ 'selected': d.selected }" @click="d.selected = !d.selected">
				{{ d.day }}
			</div>
		</div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tasks =  ref([
            {
                body: 'сходить',
                done: false
            },
            {
                body: 'купить',
                done: false
            },
            {
                body: 'сделать',
                done: false
            }
        ])

// const dates = ref([
//             {
//               day: 1,
//               selected: false
//             },
//             {
//               day: 2,
//               selected: false
//             },
//             {
//               day: 3,
//               selected: false
//             }
// ])
const daysInMonth = ref(3)
const dates = computed(()=>{
  const arr = []
  for (let i = 1; i <= daysInMonth.value; i++) {
    arr.push(
          {
            day: i,
            selected: false
          }
        )
  }
  // console.log('computed')
  return arr
})
</script>

<style scoped>
.cont {
  display: flex;
}

.selected {
  background-color: white !important;
}

.child {
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #6161A4;
}

.strike {
  text-decoration: line-through;
}
</style>