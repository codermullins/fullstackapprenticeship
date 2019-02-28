import icon from 'react-icons/lib/md/local-movies'

export default {
    name: 'productExperienceSchema',
    title: 'Product',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        
        {
            name: 'overview',
            title: 'Overview',
            type: 'blockContent'
        },
        {
            name: 'amount',
            title: 'Amount',
            type: 'string'
        },
        {
            name: 'req1',
            title: 'Requirement 1',
            type: 'string'
        },
        {
            name: 'req2',
            title: 'Requirement 2',
            type: 'string'
        },
        {
            name: 'req3',
            title: 'Requirement 3',
            type: 'string'
        },
        {
            name: 'website',
            title: 'Website',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100
            }
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true
            }
        },
    ],
    preview: {
        select: {
            title: 'title',
            type: 'type',
            media: 'logo',

        },
        prepare(selection) {
            const year = selection.date && selection.date.split('-')[0]

            return {
                title: `${selection.title} ${year ? `(${year})` : ''}`,
                date: selection.date,
                subtitle: selection.type,
                media: selection.media
            }
        }
    }
}
