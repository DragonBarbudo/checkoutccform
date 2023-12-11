<script setup>
import { animate, spring, inView } from "motion"
import TheFormInputtext from "./TheFormInputtext.vue";
import TheFormInputPhone from "./TheFormInputPhone.vue";
import InputNameSeparated from "./InputNameSeparated.vue";
const config = useConfigStore()
const form = ref()
onMounted(() => {
    animate(form.value,
        {transform: "translateY(0)", opacity: "1" },
        { duration: 1.5 },
        { easing: spring() }
    )
})

const FormWaiting = () => {
    animate(form.value,
        { opacity: ["1", ".5", "1"] },
        { duration: 1, repeat: Infinity },
        { easing: spring() }
    )
}
const FormEnd = () => {
    animate(form.value,
        {  transform: "translateY(-200%)" },
        { duration: 1 },
        { easing: spring() }
    )
}

watch(()=>config.status, (nval, oval)=>{
    if(nval == 3){
        FormWaiting()
    }
    if(nval == 4){
        FormEnd()
    }
})

// IF 3D secure
watch(()=>config.form.card, ()=>{
    if(config.secure3d){
        config.form.card.name = config.form.card.firstName + ' ' + config.form.card.lastName 
    }
}, {deep:true})

</script>
<template>
<div class="w-full -translate-y-5 opacity-0" ref="form">
    <div class="w-80 h-40 max-w-full mx-auto mb-5 overflow-hidden relative">
        <img :src="config.theLogo" class="absolute h-full w-full object-contain">
    </div>
    <div class="md:hidden"><TheCard></TheCard></div>
    <div class="TheForm  mx-auto max-w-4xl py-4 grid grid-cols-1 md:grid-cols-5 gap-1 bg-white p-3 rounded border shadow-xl">
        <div class="md:col-span-3">
            <div
                class="relative z-10  flex flex-col gap-1  p-4 ">
                <!-- CARD INFORMATION -->
                <h2 class="mb-5">{{ config.l('titleInfoCard') }}</h2>
                <div class="bg-slate-100 p-2 rounded">
                    <TheFormLabel for="cardnum">{{ config.l('cardNumber') }}</TheFormLabel>
                    <InputCardnumber v-model="config.form.card.number"></InputCardnumber>
                </div>
                <!-- NOMBRE-->
                <template v-if="!config.secure3d">
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="cardname">{{ config.l('cardName') }}</TheFormLabel>
                        <InputName v-model="config.form.card.name"></InputName>
                    </div>
                </template>
                <template v-else>
                    <div class="bg-slate-100 p-2 rounded">
                        <div class="grid md:grid-cols-2  gap-1">
                            <div>
                                <TheFormLabel for="cardFname">{{ config.l('inputName') }}</TheFormLabel>
                                <InputNameSeparated v-model="config.form.card.firstName"></InputNameSeparated>
                            </div>
                            <div>
                                <TheFormLabel for="cardLname">{{ config.l('inputLastname') }}</TheFormLabel>
                                <InputLastNameSeparated v-model="config.form.card.lastName"></InputLastNameSeparated>
                            </div>

                        </div>
                    </div>
                </template>
                




                <div class="grid md:grid-cols-2  gap-1">
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="cardexpire" mini="MM/YY">{{ config.l('cardExpiry') }}</TheFormLabel>
                        <InputExpire v-model="config.form.card.expire"></InputExpire>
                    </div>
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="cardcvc">{{ config.l('cardCVC') }}</TheFormLabel>
                        <InputCVC v-model="config.form.card.cvc"></InputCVC>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-1">
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="remember">{{ config.l('cardRemember') }}</TheFormLabel>
                        <InputRemember v-model="config.form.remembercard"></InputRemember>
                    </div>
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="creditfee">{{ config.l('cardFee') }}</TheFormLabel>
                        <InputCredit v-model="config.form.credit"></InputCredit>
                    </div>
                </div>

              
                <div class="bg-slate-100 p-2 rounded">
                    <TheFormLabel for="infoEmail" >{{ config.l('inputMail') }}</TheFormLabel>
                    <TheFormInputEmail type="email" name="infoEmail" v-model="config.form.information.email"></TheFormInputEmail>
                </div>

                <template v-if="config.secure3d">

                
                    <div class="bg-slate-100 p-2 rounded">
                        <TheFormLabel for="infoPhone" >{{ config.l('inputPhone') }}</TheFormLabel>
                        <TheFormInputPhone type="phone" name="infoPhone" v-model="config.form.information.phone"></TheFormInputPhone>
                    </div>
                    <div class="grid md:grid-cols-2 gap-1">
                        <div class="bg-slate-100 p-2 rounded">
                            <TheFormLabel for="infoCountry" >{{ config.l('inputCountry') }}</TheFormLabel>
                            <TheFormInputCountry :countries="config.worldDB.countries" name="infoCountry" v-model="config.form.information.country"></TheFormInputCountry>
                        </div>
                        <div class="bg-slate-100 p-2 rounded">
                            <TheFormLabel for="infoZipcode" >{{ config.l('inputZIP') }}</TheFormLabel>
                                <TheFormInputZipcode :countries="config.worldDB.countries" name="infoZipcode" v-model="config.form.information.zipcode"></TheFormInputZipcode>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-1">
                        <div class="bg-slate-100 p-2 rounded">
                                <TheFormLabel for="infoState" >{{ config.l('inputState') }}</TheFormLabel>
                                <TheFormInputState :countryid="config.form.information.country.id" :states="config.worldDB.states" name="infoState" v-model="config.form.information.state"></TheFormInputState>
                        </div>
                        <div class="bg-slate-100 p-2 rounded">
                                <TheFormLabel for="infoCity" >{{ config.l('inputCity') }}</TheFormLabel>
                                <TheFormInputtext :validation="config.l('inputCityVer')" name="infoCity" v-model="config.form.information.city">
                                    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                        <TheFormIcon icon="ph:house"></TheFormIcon>
                                    </div>
                                </TheFormInputtext>
                        </div>
                    </div>
                    <div class="bg-slate-100 p-2 rounded">
                            <TheFormLabel for="infoAddress1" >{{ config.l('inputAddress') }}</TheFormLabel>
                            <TheFormInputtext :validation="config.l('inputAddressVer')" name="infoAddress1" v-model="config.form.information.address1">
                                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                    <TheFormIcon icon="ph:buildings"></TheFormIcon>
                                </div>
                            </TheFormInputtext>
                            <TheFormInputtext :norequired="true" name="infoAddress2" v-model="config.form.information.address2" class="mt-2">
                                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                    <TheFormIcon icon="ph:buildings"></TheFormIcon>
                                </div>
                            </TheFormInputtext>
                    </div>
                </template>
            </div>
        </div>
        

        <div class="md:col-span-2 flex flex-col p-4">
            <div class="sticky top-6">
                <div class="hidden md:block"><TheCard></TheCard></div>
                <TheFormInfo></TheFormInfo>
                <DoPayment></DoPayment>
            </div>
        </div>

    </div>
</div>
</template>

<style scoped></style>