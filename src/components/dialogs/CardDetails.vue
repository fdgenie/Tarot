<template>
  <q-dialog persistent v-model="open">
    <q-card style="width: 100vw;">
      <q-card-section class="flex flex-center">
        <div class="text-h6">
          {{ card.name }}
        </div>
      </q-card-section>

      <q-card-section class="flex flex-center">
          <q-img style="width: 300px" :src="card.image" spinner-color="white" />
          <div class="text-subtitle1 q-mt-md">
          {{ card.full_meaning }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="dark" :label="$t('words.back')" @click="hide" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CardDetails",
  data() {
    return {
      open: false,
      card: {}
    };
  },
  methods: {
    show(card) {
      this.open = true;
      if (card) {
        this.card = card;
      }
    },
    hide() {
      this.open = false;
    }
  }
};
</script>
