<template>
  <q-card flat class="background-color container">
    <q-card-section class="row flex flex-center">
      <div class="col offset-md-2">
        <strong>
          {{ $t("words.latest_reading") }}
        </strong>
      </div>
    </q-card-section>
    <span>
      <q-card-section
        v-for="card in cards"
        :key="card.id"
        class="row justify-center"
      >
        <div class="col offset-md-2">
          <q-btn flat @click="seeCardDetails(card)">
            {{ card.card.name }}
          </q-btn>
        </div>
        <div class="col offset-md-3">
          {{ card.card.datePicked }}
        </div>
      </q-card-section>
    </span>
    <card-details ref="CardDetails" />
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import CardDetails from "components/dialogs/CardDetails";

export default {
  name: "CardBoardCards",
  components: {
    CardDetails
  },
  computed: {
    ...mapGetters({
      cards: "cards/getCards",
      userId: "user/getUserId"
    })
  },
  mounted() {
    this.$store.dispatch("cards/latestReadings", this.userId);
  },
  methods: {
    seeCardDetails(card) {
      this.$refs.CardDetails.show(card.card);
    }
  }
};
</script>
