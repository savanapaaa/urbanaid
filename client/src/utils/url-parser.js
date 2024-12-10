const UrlParser = {
    parseActiveUrlWithCombiner() {
        const url = window.location.hash.slice(1).toLowerCase();
        const splitedUrl = this._urlSplitter(url);
        return this._urlCombiner(splitedUrl);
    },

    parseActiveUrlWithoutCombiner() {
        const url = window.location.hash.slice(1).toLowerCase();
        return this._urlSplitter(url);
    },

    _urlSplitter(url) {
        try {
            const urlsSplits = url.split('/');
            return {
                resource: this._sanitizeUrlPart(urlsSplits[1]) || null,
                id: this._sanitizeUrlPart(urlsSplits[2]) || null,
                verb: this._sanitizeUrlPart(urlsSplits[3]) || null,
                subResource: this._sanitizeUrlPart(urlsSplits[4]) || null,
                reportId: this._sanitizeUrlPart(urlsSplits[5]) || null,
            };
        } catch (error) {
            console.error('Error splitting URL:', error);
            return {
                resource: null,
                id: null,
                verb: null,
                subResource: null,
                reportId: null,
            };
        }
    },

    _urlCombiner(splitedUrl) {
        try {
            let combinedUrl = splitedUrl.resource ? `/${splitedUrl.resource}` : '/';

            if (splitedUrl.id) {
                combinedUrl += `/${splitedUrl.id}`;
            }

            if (splitedUrl.verb) {
                combinedUrl += `/${splitedUrl.verb}`;
            }

            if (splitedUrl.subResource) {
                combinedUrl += `/${splitedUrl.subResource}`;
            }

            if (splitedUrl.reportId) {
                combinedUrl += `/${splitedUrl.reportId}`;
            }

            return combinedUrl;
        } catch (error) {
            console.error('Error combining URL:', error);
            return '/';
        }
    },

    _sanitizeUrlPart(part) {
        if (!part) return null;
        return part.replace(/[^a-zA-Z0-9-_\.]/g, '');
    },

    getReportDetails() {
        const parsed = this.parseActiveUrlWithoutCombiner();
        if (parsed.resource !== 'pelaporan') return null;

        return {
            section: parsed.id || 'beranda',
            reportId: parsed.verb || null,
            action: parsed.subResource || null
        };
    },

    isReportPage() {
        const parsed = this.parseActiveUrlWithoutCombiner();
        return parsed.resource === 'pelaporan';
    },

    getDetailId() {
        const parsed = this.parseActiveUrlWithoutCombiner();
        if (parsed.resource === 'pelaporan' && parsed.id === 'riwayat') {
            return parsed.verb; 
        }
        return null;
    },

    isDetailPage() {
        const parsed = this.parseActiveUrlWithoutCombiner();
        return parsed.resource === 'pelaporan' && 
               parsed.id === 'riwayat' && 
               parsed.verb !== null;
    },

    getQueryParams() {
        const hash = window.location.hash;
        const queryIndex = hash.indexOf('?');
        if (queryIndex === -1) return {};

        const queryString = hash.slice(queryIndex + 1);
        const urlSearchParams = new URLSearchParams(queryString);
        const params = {};

        for (const [key, value] of urlSearchParams) {
            params[key] = value;
        }

        return params;
    },

    createUrlWithQuery(baseUrl, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
};

export default UrlParser;
