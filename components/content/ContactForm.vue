<script setup>
import { ref } from 'vue'

// Sets minimum date to tomorrow
const today = new Date()
today.setDate(today.getDate() + 1)
const tomorrow = today.toISOString().split('T')[0]
</script>

<template>
  <section class="mt-16 max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-3xl shadow-sm">
    <form name="contact" method="POST" data-netlify="true" class="space-y-6">
      <input type="hidden" name="form-name" value="contact" />

      <!-- Name -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
        <input type="text" name="name"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-black/20 outline-none"
          required />
      </div>

      <!-- Email -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Email</label>
        <input type="email" name="email"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-black/20 outline-none"
          required />
      </div>

      <!-- Session Type -->
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

      <!-- Vision / Message -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Tell us about your vision</label>
        <textarea name="message" rows="5"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"></textarea>
      </div>

      <!-- Date Picker -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Preferred Date</label>
        <input 
          type="date"
          name="date"
          :min="tomorrow"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          required
        />
      </div>

      <!-- Start Time (free input) -->
      <div>
        <label class="block mb-2 font-medium text-zinc-700 dark:text-zinc-300">Preferred Start Time</label>
        <input
          type="text"
          name="startTime"
          placeholder="e.g., 10:00 AM"
          class="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        />
      </div>

      <!-- Budget -->
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

      <!-- Submit Button -->
      <button
        class="w-full py-4 text-lg font-semibold rounded-xl bg-black text-white hover:bg-zinc-800 transition-all">
        Send Inquiry
      </button>

        <!-- Privacy Note -->
      <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </form>
  </section>
</template>