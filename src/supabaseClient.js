import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lafrbhntdzfexqrlokzc.supabase.co' // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZnJiaG50ZHpmZXhxcmxva3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMDg0NDgsImV4cCI6MjA3NDU4NDQ0OH0.CLv-W7o7S-zou-YFeuN-bM2buj38d4QDwaaAQdAnR6g' // Replace with your anon public key (not the service role)

export const supabase = createClient(supabaseUrl, supabaseKey)

