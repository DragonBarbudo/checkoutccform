import {ref, computed} from 'vue'
import world from './world.js'

export const useConfigStore = defineStore('config', () => {
    //0:loading, 1:starting, 2:formview, 3:paying, 4: done
    const status = ref(0)
    const worldDB = world

    const theLogo = _a.logo;
    const thePowered = _a.poweredby;
    const thePoweredLink = _a.poweredbyLink;
    const theContinue = _a.continue
    
    const theLogos = _a.logos;

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
                cvc: ''
            },
            rememberCard: false,
            credit: {},
            information: {
                firstName: '',
                lastName: '',
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

    return { l,  status, getStatus, form, worldDB, formIsValid, theLogo, theLogos, thePowered, thePoweredLink, theContinue, acceptance, texts }
  })