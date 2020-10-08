<template>
  <q-card flat class="background-color container">
    <q-card-section class="row flex flex-center">
      <div class="col offset-md-2">
        <strong>
          {{ $t("words.latest_reading") }}
        </strong>
      </div>
    </q-card-section>
    <span v-if="cards.length !== 0">
      <q-card-section
        v-for="card in cards"
        :key="card.id"
        class="row justify-center"
      >
        <div class="col offset-md-2">
          {{ card.card.name }}
        </div>
        <div class="col offset-md-3">
          {{ card.card.datePicked }}
        </div>
      </q-card-section>
    </span>
    <span v-else>
      <q-card-section class="row justify-center">
        <div class="col offset-md-2">
          {{ card.name }}
        </div>
        <div class="col offset-md-3">
          {{ card.datePicked }}
        </div>
      </q-card-section>
    </span>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CardBoardCards",
  props: {
    card: {
      type: [Boolean, Object],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      cards: "cards/getCards",
      userId: "user/getUserId"
    })
  },
  mounted() {
    this.$store.dispatch("cards/latestReadings", this.userId);
  }
};
</script>
