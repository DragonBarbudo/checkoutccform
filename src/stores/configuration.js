import {ref, computed} from 'vue'
import world from './world.js'

export const useConfigStore = defineStore('config', () => {

    //0:loading, 1:starting, 2:formview, 3:paying, 4: done
    // 99: isPaid, 100: expiredLink
    const status = ref(0)
    const worldDB = world
    const secure3d = _a.secure3d
    const theLogo = _a.logo;
    const thePowered = _a.poweredby;
    const thePoweredLink = _a.poweredbyLink;
    const theContinue = _a.continue
    const theLogos = _a.logos;

    if(_a.ispaid){
        status.value = 99
    }
    if(_a.expiredlink){
        status.value = 100
    }

    const getStatus = computed(()=>{
        return status.value
    })

    const formIsValid = ref({})
    
    const form = ref(
        {
            card: {
                number: '',
                name: '',
                expire: '',
                cvc: '',
                firstName: '',
                lastName: ''
            },
            rememberCard: false,
            credit: {},
            information: {
                email: '',
                phone: '',
                zipcode: '',
                country: '',
                city: '',
                state: '',
                address1: '',
                address2: ''
            },
            payment: [
                //label, value, class, currency
                ["Referencia", _a.payment.reference, "text-xs", false],
                ["Total", _a.payment.total, "text-xl", true]
            ]
        }
    )

    const acceptance = ref({
        terms: false,
        privacy: false
    })

    const texts = {
        terms: _a.texts.terms,
        privacy: _a.texts.privacy,
    }
    
    //Localization
    const l = (tag) => {
        return _l[tag]
    }

    return { l,  status, getStatus, form, worldDB, formIsValid, theLogo, theLogos, thePowered, thePoweredLink, theContinue, acceptance, texts, secure3d }
  })