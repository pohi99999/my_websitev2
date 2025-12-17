import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { FileText } from 'lucide-react';

const DOCUMENTATION_URL =
  'https://drive.google.com/file/d/1POdnrlcRS600ZG1nHxMxlDfTY9R6MFIH/view?usp=drive_link';

export default function DocumentationSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <GsapFadeIn>
          <a
            href={DOCUMENTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label="Rendszer dokumentációja megnyitása (új fülön)"
          >
            <SpotlightCard className="p-10 sm:p-12 cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-center sm:text-left">
                <div className="mx-auto sm:mx-0 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-300">
                  <FileText className="h-7 w-7" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Rendszer dokumentációja</h3>
                  <p className="text-gray-300">
                    Töltse le a részletes technikai specifikációt és a BAS működési kézikönyvét.
                  </p>
                </div>

                <div className="sm:ml-auto">
                  <span className="btn-secondary inline-flex items-center justify-center">
                    Megnyitás
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </a>
        </GsapFadeIn>
      </div>
    </section>
  );
}
