import { createClient } from "@supabase/supabase-js";

// Estas dos claves son públicas a propósito: están protegidas por las
// políticas de seguridad (Row Level Security) configuradas en Supabase,
// no por mantenerlas en secreto. Es normal y seguro que estén en el código.
const SUPABASE_URL = "https://znmovnkmzudtkrdsmxki.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wIj1Bywa1y2vk5qRJsgFwg_6Yuyz3-h";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
