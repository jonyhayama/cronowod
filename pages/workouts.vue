<script setup>
import { useStorage } from '@vueuse/core'
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const workouts = useStorage('cronowod/workouts', {
  v: "0.1",
  items: []
}, localStorage, { mergeDefaults: true });
const emptyWorkout = {
  name: '',
  description: ''
};

const maxWorkouts = 5;
const workout = ref({});
const workoutDialog = ref(false);
const submitted = ref(false);

const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < workouts.value.items.length; i++) {
    if (workouts.value.items[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};

const openNew = () => {
  workout.value = { ...emptyWorkout };
  submitted.value = false;
  workoutDialog.value = true;
};
const hideDialog = () => {
  workoutDialog.value = false;
  submitted.value = false;
};

const deleteWorkout = (workout) => {
  if (!confirm("Are you sure?")) {
    return;
  }

  const index = workouts.value.items.indexOf(workout);
  workouts.value.items.splice(index, 1);
};
const editWorkout = (data) => {
  workout.value = { ...data };
  submitted.value = false;
  workoutDialog.value = true;
};
const saveWorkout = () => {
  submitted.value = true;

  if (workout?.value.name?.trim() && workout?.value.description?.trim()) {
    if (workout.value.id) {
      workouts.value.items[findIndexById(workout.value.id)] = workout.value;
      toast.add({severity:'success', summary: 'Successful', detail: 'Workout Updated', life: 3000});
    } else {
      workout.value.id = createId();
      workouts.value.items.push(workout.value);
      toast.add({severity:'success', summary: 'Successful', detail: 'Workout Created', life: 3000});
    }

    workoutDialog.value = false;
    workout.value = {};
  }
};
</script>

<template>
  <h1>Workouts</h1>
  
  <Button v-if="workouts.items.length < maxWorkouts" label="New" icon="pi pi-plus" @click="openNew" />
  <div v-else>You can only add 5 workouts.</div>

  <DataTable :value="workouts.items" editMode="row">
    <Column field="name" header="Name" />
    <Column field="description" header="Description">
      <template #body="{ data }">
        <div style="white-space: pre;">{{ data.description }}</div>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <div style="display: flex; gap: 0.5rem;">
          <Button icon="pi pi-pencil" outlined rounded @click="editWorkout(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteWorkout(slotProps.data)" />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="workoutDialog" :style="{ width: '450px' }" header="Workout Details" :modal="true">
    <div>
      <label for="name" class="block font-bold mb-3">Name</label>
      <InputText id="name" v-model.trim="workout.name" required="true" autofocus :invalid="submitted && !workout.name" fluid />
      <small v-if="submitted && !workout.name" class="text-red-500">Name is required.</small>
    </div>
    <div>
      <label for="description" class="block font-bold mb-3">Description</label>
      <Textarea id="description" v-model="workout.description" required="true" rows="8" cols="20" :invalid="submitted && !workout.description" fluid style="resize: none"/>
      <small v-if="submitted && !workout.description" class="text-red-500">Description is required.</small>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveWorkout" />
    </template>
  </Dialog>
</template>