<script setup>
import { Icon } from '@iconify/vue';
import { animate, spring, inView } from "motion"
import { useConfigStore } from '../stores/configuration';
const config = useConfigStore()

const dialogPrivacy = ref()
const dialogTerms = ref()

const openDialog = (name) => {
    if(name=='privacy'){
        dialogPrivacy.value.showModal()
    }
    if(name=='terms'){
        dialogTerms.value.showModal()
    }
}

const inputTerms = ref(false)
const inputPrivacy = ref(false)

</script>
<template>
<div class="my-4 text-xs flex flex-col gap-4">
    <TermsPrivacyBTN v-model="config.acceptance.privacy" :label="config.l('payPrivacyPrefix')+'&nbsp; '" :link="config.l('payPrivacy')">
        {{ config.texts.privacy }}
    </TermsPrivacyBTN>
    <TermsPrivacyBTN v-model="config.acceptance.terms" :label="config.l('payTermsPrefix')+'&nbsp; '" :link="config.l('payTerms')">
        {{ config.texts.terms }}
    </TermsPrivacyBTN>

</div>
</template>