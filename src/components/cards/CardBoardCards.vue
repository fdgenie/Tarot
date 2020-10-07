<template>
  <q-card flat class="background-color container">
    <q-card-section class="row flex flex-center">
      <div class="col offset-md-2">
        <strong>
          {{ $t("words.latest_reading") }}
        </strong>
      </div>
    </q-card-section>
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
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CardBoardCards",
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
