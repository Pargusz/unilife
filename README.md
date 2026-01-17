# UniLife - Premium Öğrenci Asistanı

Üniversite öğrencileri için geliştirilmiş, not ortalaması hesaplama, odaklanma sayacı ve görev takibi içeren premium bir web uygulaması.

## Özellikler
- **Ortalama Hesaplayıcı**: Etkileşimli girişler ve görsel geri bildirim ile AGNO/ANO hesaplayın.
- **Odak Modu**: Derin çalışma seansları için ambiyanslı Pomodoro sayacı.
- **Görev Yöneticisi**: Ödevler ve projeler için düzenli yapılacaklar listesi.
- **Premium Tasarım**: Glassmorphism ve neon vurgularla "Gece Mavisi" teması.

## Geliştirme

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Yerel sunucuyu başlatın:
   ```bash
   npm run dev
   ```

## GitHub Pages Dağıtımı

Bu proje Vite ile oluşturulmuştur. GitHub Pages'de yayınlamak için:

1. GitHub'da `unilife` adında yeni bir depo (repository) oluşturun.
2. Bu projeyi o depoya gönderin:
   ```bash
   git remote add origin https://github.com/KULLANICI_ADI/unilife.git
   git branch -M main
   git push -u origin main
   ```
3. Projeyi derleyin:
   ```bash
   npm run build
   ```
4. `dist` klasörünün içeriğini `gh-pages` dalına (branch) gönderin veya Repo Ayarları > Pages kısmından kaynağı ayarlayın.
