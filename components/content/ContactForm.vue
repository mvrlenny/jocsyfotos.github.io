<script setup>
import { ref, onMounted } from 'vue'

// 📅 Minimum date = tomorrow
const today = new Date()
today.setDate(today.getDate() + 1)
const tomorrow = today.toISOString().split('T')[0]

// ⏱️ Time tracking
const startTime = ref(0)

onMounted(() => {
  startTime.value = Date.now()
})

// 🧠 Handle submit (Formspree + Anti-spam)
const handleSubmit = (e) => {
  const form = e.target
  const timeTaken = Date.now() - startTime.value
  const honeypot = form.website?.value

  let isSuspicious = false

  // 🪤 Honeypot triggered
  if (honeypot) {
    console.warn("⚠️ Honeypot triggered (bot)")
    isSuspicious = true
  }

  // ⏱️ Too fast (bot-like behavior)
  if (timeTaken < 3000) {
    console.warn(`⚠️ Too fast (${timeTaken}ms)`)
    isSuspicious = true
  }

  // 🧠 Attach hidden tracking fields
  const inputTime = document.createElement('input')
  inputTime.type = 'hidden'
  inputTime.name = 'timeTaken'
  inputTime.value = timeTaken
  form.appendChild(inputTime)

  if (isSuspicious) {
    const inputSuspicious = document.createElement('input')
    inputSuspicious.type = 'hidden'
    inputSuspicious.name = 'suspicious'
    inputSuspicious.value = 'true'
    form.appendChild(inputSuspicious)
  }

  // IMPORTANT:
  // We DO NOT prevent default — Formspree handles submission
}
</script>

<template>
  <section class="mt-16 max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-3xl shadow-sm">

    <form 
      action="https://formspree.io/f/mykljnzo"
      method="POST"
      @submit="handleSubmit"
      class="space-y-6"
    >

      <!-- 🪤 Honeypot (anti-bot) -->
      <div style="position:absolute; left:-9999px;">
        <label>Don’t fill this out if you're human:</label>
        <input type="text" name="website" tabindex="-1" autocomplete="off" />
      </div>

      <!-- Name -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Full Name
        </label>
        <input 
          type="text" 
          name="name" 
          required
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          required
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Phone Number -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Phone Number
        </label>
        <input 
          type="tel" 
          name="phone" 
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Location -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Location
        </label>
        <input 
          type="text" 
          name="location" 
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Session -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Type of Session
        </label>
        <select 
          name="session"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        >
          <option>Portraits & Personal Moments</option>
          <option>Events & Celebrations</option>
          <option>Brands, Products, & Businesses</option>
          <option>Real Estate & Property</option>
          <option>Weddings & Intimate Experiences</option>
          <option>Creative / Documentary Project</option>
          <option>I’m not sure yet</option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Tell us about your vision
        </label>
        <textarea 
          name="message" 
          rows="5"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        ></textarea>
      </div>

      <!-- Date -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Preferred Date
        </label>
        <input 
          type="date"
          name="date"
          :min="tomorrow"
          required
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Time -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Preferred Start Time
        </label>
        <input
          type="text"
          name="startTime"
          placeholder="e.g., 10:00 AM"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Budget -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">
          Estimated Budget
        </label>
        <select 
          name="budget"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        >
          <option>$250 – $400</option>
          <option>$400 – $800</option>
          <option>$800 – $1,500</option>
          <option>$1,500+</option>
          <option>I'm not sure yet</option>
        </select>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full py-4 text-lg font-semibold rounded-xl bg-black text-white hover:bg-zinc-800 transition-all"
      >
        Send Inquiry
      </button>

      <!-- Privacy -->
      <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>

    </form>
  </section>
</template>