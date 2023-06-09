import { ref } from "vue";

export default function useClickEvent() {
  const count = ref(0)

  const plus = () => {
    count.value++
    console.log('plus')
  }

  return {
    plus,
    count
  }
}
