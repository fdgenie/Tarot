<template>
  <q-page class="background-color" padding>
    <q-toolbar class="row">
      <q-toolbar-title class="col flex flex-center">
        <q-icon name="mdi-format-list-checks" />
        {{ $t("words.tarrot_teller") }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="row flex flex-center q-mt-lg">
      {{ $t("words.card_of_day") }}
    </div>
    <div class="row flex flex-center q-mt-sm">
      <q-btn round @click="seeTodayCard" size="100px" flat v-if="!card || !card.todayChecked || card.datePicked !== today">
        <q-img
          size="100px"
          src="../../public/icons/tarot_back.png"
          spinner-color="white"
        />
      </q-btn>
      <q-btn  v-else round flat size="100px">
        <q-img :src="card.image" spinner-color="white" />
      </q-btn>
    </div>
    <div class="row flex flex-center q-mt-sm">
      {{ card.name }}
    </div>
    <div class="col q-mt-lg">
      <card-board-cards />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import CardBoardCards from "components/cards/CardBoardCards";

export default {
  name: "Tarrot",
  components: {
    CardBoardCards
  },
  computed: {
    ...mapGetters({
      card: "cards/getCard"
    }),
    today() {
      const [month, date, year] = new Date().toLocaleDateString().split("/");
      return date + "-" + month + "-" + year;
    }
  },
  methods: {
    seeTodayCard() {
      this.$store.dispatch("cards/card");
    }
  },
  mounted() {
    this.$store.dispatch("cards/lastCard");
  }
};
</script>
