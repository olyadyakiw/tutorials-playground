import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://yufdxmckkfvfonfphcwj.supabase.co'
const supabaseKey = 'sb_publishable_ObGNhBJLjIpdkpSn1JSMqQ_3F7pXNnf'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
