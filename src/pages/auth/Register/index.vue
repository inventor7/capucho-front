<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          منصة الذكاء الاصطناعي لتجارة جزائرية ذكية
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="businessName" class="sr-only">اسم المتجر</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              v-model="businessName"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="اسم المتجر"
            />
          </div>
          <div>
            <label for="email" class="sr-only">البريد الإلكتروني</label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="البريد الإلكتروني"
            />
          </div>
          <div>
            <label for="password" class="sr-only">كلمة المرور</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="كلمة المرور"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="!loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- User add icon -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ loading ? 'جاري التحميل...' : 'إنشاء الحساب' }}
          </button>
        </div>

        <div class="text-center">
          <RouterLink to="/auth/login" class="text-sm text-indigo-600 hover:text-indigo-500">
            لديك حساب؟ سجل الدخول
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const businessName = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()
const { showError, showSuccess } = useToast()

const register = async () => {
  if (!email.value || !password.value || !businessName.value) {
    showError('الرجاء ملء جميع الحقول')
    return
  }

  loading.value = true
  try {
    await authStore.register({
      email: email.value,
      password: password.value,
      businessName: businessName.value,
    })
    showSuccess('تم إنشاء الحساب بنجاح')
    router.push('/onboarding/store-setup')
  } catch (error: any) {
    showError(error.message || 'خطأ في إنشاء الحساب')
  } finally {
    loading.value = false
  }
}

definePage({
  meta: {
    title: 'Register',
    description: 'Create a new account for Jawbli - AI-powered e-commerce platform',
    category: 'authentication',
    hideFromSearch: true,
    requiresAuth: false,
    layout: 'empty',
  },
})
</script>
