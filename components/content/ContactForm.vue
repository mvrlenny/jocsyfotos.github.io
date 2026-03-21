<script setup>
import { ref, computed } from 'vue'

// Date handling
const selectedDate = ref(null)
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

// Format date for Netlify submission
const selectedDateFormatted = computed(() =>
  selectedDate.value ? selectedDate.value.toISOString().split('T')[0] : ''
)
</script>

<template>
  <section class="mt-16 max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-3xl shadow-sm">
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field" 
      class="space-y-6"
    >
      <!-- Netlify hidden fields -->
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

        <!-- Honey pot to block spam -->
         <p class="hidden">
          <label>Don’t fill this out: <input name="bot-field" /></label>
        </p>

      <!-- Full Name -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
        <input type="text" name="name" required
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-black/20 outline-none" />
      </div>

      <!-- Email -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Email</label>
        <input type="email" name="email" required
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-black/20 outline-none" />
      </div>

      <!-- Phone -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Phone (optional)</label>
        <input type="tel" name="phone"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-black/20 outline-none" />
      </div>

      <!-- Type of Session -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Type of Session</label>
        <select name="session"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <option>Portraits & Personal Moments</option>
          <option>Events & Celebrations</option>
          <option>Brands, Products, & Businesses</option>
          <option>Real Estate & Property</option>
          <option>Weddings & Intimate Experiences</option>
          <option>Creative / Documentary Project</option>
          <option>I’m not sure yet</option>
        </select>
      </div>

      <!-- Vision Message -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Tell us about your vision</label>
        <textarea name="message" rows="5"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"></textarea>
      </div>

      <!-- Preferred Date -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Preferred Date</label>
        <input 
          type="date" 
          name="date"
          :min="tomorrow.toISOString().split('T')[0]"
          v-model="selectedDate"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none"
        />
        <input type="hidden" name="date-formatted" :value="selectedDateFormatted" />
      </div>

      <!-- Estimated Budget -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Estimated Budget</label>
        <select name="budget"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <option>$150 – $400</option>
          <option>$400 – $800</option>
          <option>$800 – $1,500</option>
          <option>$1,500+</option>
          <option>I'm not sure yet</option>
        </select>
      </div>

      <!-- Privacy Note -->
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
      We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>

      <!-- Submit Button -->
      <button type="submit"
        class="w-full py-4 text-lg font-semibold rounded-xl bg-black text-white hover:bg-zinc-800 transition-all">
        Send Inquiry
      </button>
    </form>
  </section>
</template>