<template>
  <q-page class="background-color" padding>
    <q-toolbar class="row">
      <q-toolbar-title class="col flex flex-center">
        <q-icon name="mdi-format-list-checks" />
        {{ $t("words.tarot_teller") }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="row flex flex-center q-mt-lg">
      {{ $t("words.card_of_day") }}
    </div>
    <div v-if="isChecked" class="text-h6 row flex flex-center q-mt-sm">
      {{ card.name }}
    </div>
    <div class="row flex flex-center q-mt-sm">
      <q-btn v-if="isChecked" round flat size="100px">
        <q-img
          :src="card.image"
          spinner-color="white"
          @click="seeCardDetails"
          :class="card.isReverse === 0 ? 'rotate-180' : false"
        />
      </q-btn>
      <q-btn round @click="seeTodayCard" size="100px" flat v-else>
        <q-img src="../../public/icons/tarot_back.png" spinner-color="white" />
      </q-btn>
    </div>
    <div v-if="isChecked" class="text-h6 row flex flex-center q-mt-sm">
      <div>
        {{ card.isReverse === 0 ? card.reversed : card.upright }}
      </div>
    </div>
    <div v-if="isChecked" class="text-subtitle2 row flex flex-center q-mt-sm">
      <div class="col-6">
        {{ card.summary }}
      </div>
    </div>
    <div class="col q-mt-lg">
      <card-board-cards :card="card" />
    </div>
    <card-details ref="CardDetails" />
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import CardBoardCards from "components/cards/CardBoardCards";
import CardDetails from "components/dialogs/CardDetails";

export default {
  name: "Tarot",
  components: {
    CardBoardCards,
    CardDetails
  },
  computed: {
    ...mapGetters({
      card: "cards/getCard",
      userId: "user/getUserId"
    }),
    today() {
      const [month, date, year] = new Date().toLocaleDateString().split("/");
      return date + "-" + month + "-" + year;
    },
    isChecked() {
      return (
        this.card &&
        this.card.todayChecked &&
        this.card.datePicked === this.today
      );
    }
  },
  methods: {
    seeTodayCard() {
      this.$store.dispatch("cards/card", this.userId);
    },
    seeCardDetails() {
      this.$refs.CardDetails.show(this.card);
    }
  },
  mounted() {
    this.$store.dispatch("cards/lastCard", this.userId);
  }
};
</script>
