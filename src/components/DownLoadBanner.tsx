

export default function DownLoadBanner() {
    return (
        <>
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">Tải ứng dụng DormSpace</h2>
              <p className="text-xl mb-6">Trải nghiệm tìm kiếm và đặt phòng ký túc xá mọi lúc, mọi nơi với ứng dụng DormSpace trên điện thoại di động</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-900 transition">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.928 19.443c-.033 2.784-3.39 4.26-3.465 4.297a.54.54 0 01-.232.054.545.545 0 01-.275-.074c-3.439-1.921-3.116-7.21-3.087-7.571a.566.566 0 01.147-.362.537.537 0 01.372-.174l6.03-.545a.56.56 0 01.51.667zm1.993-10.169l-4.338 2.256 3.176 3.176c.166.166.166.434 0 .6s-.434.166-.6 0l-3.176-3.176-3.176 3.176a.416.416 0 01-.3.125.416.416 0 01-.3-.125.424.424 0 010-.6l3.176-3.176-3.176-3.176a.424.424 0 010-.6c.166-.166.434-.166.6 0l3.176 3.176 4.338 2.256c.221.114.304.383.193.606a.444.444 0 01-.606.193l-4.338-2.256v4.512c0 .232-.189.422-.422.422s-.422-.189-.422-.422v-4.512l-4.338 2.256a.414.414 0 01-.193.048.439.439 0 01-.414-.24.444.444 0 01.193-.606l4.338-2.256-4.338-2.256a.444.444 0 01-.193-.606c.111-.223.38-.304.606-.193l4.338 2.256V4.422c0-.232.189-.422.422-.422s.422.189.422.422v4.512l4.338-2.256a.444.444 0 01.606.193c.111.223.028.492-.193.606l-4.338 2.256z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Tải về trên</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
                <a href="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-900 transition">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.7c-.14 0-.27-.04-.38-.12-.29-.19-.5-.57-.5-1.08V1.5c0-.51.21-.9.5-1.08.26-.17.65-.17 1.08.01l19.16 10.45c.44.24.66.59.66.94s-.22.7-.66.94L3.88 23.21c-.24.13-.48.19-.7.19zM4.86 3.37v17.26L19.76 12 4.86 3.37z" />
                  </svg>
                  <div>
                    <div className="text-xs">Tải về trên</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-96 w-64">
                <div className="absolute top-0 w-full h-full rounded-3xl border-8 border-gray-800 bg-gray-200 overflow-hidden flex items-center justify-center">
                  <span className="text-gray-600">Ứng dụng DormSpace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>   
        </>
    )
}