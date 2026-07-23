export type MonthlyContentPageKey = 'subscription-details' | 'subscription-ab-reviews' | 'subscription-intensive';

export const monthlyContentDefaults = {
	'subscription-details': {
		isEnrollmentClosed: false,
		enrollmentReopenMessage: 'سيتم فتح الاشتراك للمشتركين الجدد مع بداية الشهر القادم بإذن الله.',
		subscriptionDetails: {
			month: ' شهر مايو 2026',
			groupC: {
				name: 'جروب C',
				price: '800',
			},
			currency: 'ج',
			features: [
				'فيديوهات تأسيسية في جميع المواد',
				'فيديوهات شرح تفصيلية للمناهج',
				'فيديوهات حل بنوك المسائل',
				'ملازم وملفات PDF للتحميل',
				'امتحانات إلكترونية تفاعلية',
				'تتبع التقدم والدرجات',
				'دعم فني على مدار الساعة',
				'سيستم متابعة كامل (جديد)'
			],
			offers: [
				'خصم 20% للطلاب الجدد',
				'ضمان استرداد المبلغ خلال 7 أيام',
				'وصول مدى الحياة للمحتوى',
				'شهادة إنجاز معتمدة'
			],
			googleForms: {
				groupC: {
					key: 'groupC',
					label: 'جروب C',
					description: 'للمشتركين الجدد جروب C',
					buttonText: 'سجل فورم جروب C',
					link: 'https://forms.gle/mXzLb7Bnff43GUxK8',
					isClosed: false
				}
			},
			vodafoneNumbers: [
				{ number: '01040490778', owner: 'احمد ع********* س***' },
				{ number: '01040490779', owner: 'سعد ف** ص*** ا***' },
				{ number: '01025326080', owner: 'احمد م**** ا***** ز***' },
				{ number: '01080681865', owner: 'Mona k***** A**' },
			],
			scheduleImages: [
				{
					group: 'جدول جروب C',
					src: '/assets/جروب C.jpeg?v=20260621',
					alt: 'جدول محتوى شهر مايو - جروب C',
					note: '👆 اضغط على الصورة للتكبير'
				}
			],
			requiredInfo: [
				'رقم الموبايل اللي حولت منه 📲',
				'سكرين شوت بالتحويل 🖼',
				'وقت وتاريخ التحويل ⏳'
			],
			whatsappNumber: '201554843745',
			subscriptionWarnings: {
				validity: {
					title: 'مدة صلاحية الاشتراك:',
					points: [
						'الكود شغال لغاية آخر الشهر فقط',
						'مع انتهاء الشهر بيقفل المحتوى تلقائياً',
						'عند تجديد الاشتراك الكود الجديد بيفتحلك كل المحتوى من الأول'
					]
				},
				refund: {
					title: 'سياسة الاسترداد:',
					points: [
						'السحب متاح خلال أسبوع من الاشتراك مع استرداد نصف المبلغ فقط',
						'بعد الأسبوع، لا يُمكن استرداد أي مبلغ'
					]
				}
			},
			subtitle: ' الشهر الثامن لدفعة 2026 — جروب C '
		}
	},
	'subscription-ab-reviews': {
		isEnrollmentClosed: false,
		enrollmentReopenMessage: 'سيتم فتح المراجعات مع بداية الشهر القادم بإذن الله.',
		subscriptionDetails: {
			month: 'مراجعات شهر أغسطس 2026',
			review: {
				name: 'مراجعات A-B-C',
				price: '800'
			},
			groups: {
				groupAB: { name: 'مراجعات A-B', price: '800' },
				groupC: { name: 'مراجعات C', price: '800' }
			},
			currency: 'ج',
			features: [
				'فيديوهات المراجعة',
				'محتوى السبورة (PDF)',
				'فيديوهات حل الواجبات بالتفصيل',
				'اختبارات إلكترونية تقييمية أسبوعياً',
				'playlist شرح المنهج كاملاً'
			],
			googleForm: {
				label: 'مراجعات A-B',
				description: 'فورم اشتراك مراجعات أغسطس',
				buttonText: 'سجل فورم المراجعة',
				link: 'https://forms.gle/J6CBxzZuFCEz2AmA6',
				isClosed: false
			},
			googleForms: {
				groupAB: {
					label: 'مراجعات A-B', description: 'فورم اشتراك مراجعات A-B', buttonText: 'سجل فورم مراجعات A-B',
					link: 'https://forms.gle/J6CBxzZuFCEz2AmA6', isClosed: false
				},
				groupC: {
					label: 'مراجعات C', description: 'فورم اشتراك مراجعات C', buttonText: 'سجل فورم مراجعات C',
					link: 'https://forms.gle/jwKoocsd4m7yANQW6', isClosed: false
				}
			},
			vodafoneNumbers: [
				{ number: '01025326080', owner: 'احمد م**** ا***** ز***' },
				{ number: '01040490779', owner: 'سعد ف** ص*** ا***' },
				{ number: '01040490778', owner: 'احمد ع********* س***' },
				{ number: '01080681865', owner: 'Mona k***** A**' }
			],
			scheduleImages: [
				{
					groupKey: 'groupAB',
					group: 'جدول مراجعات A-B',
					src: '/assets/جداول مراجعات شهر 8/جدول جروب A-B.png',
					alt: 'جدول مراجعات شهر أغسطس - جروب A و B',
					note: '👆 اضغط على الصورة للتكبير'
				},
				{
					groupKey: 'groupC',
					group: 'جدول مراجعات C',
					src: '/assets/جداول مراجعات شهر 8/جدول جروب C.png',
					alt: 'جدول مراجعات شهر أغسطس - جروب C',
					note: '👆 اضغط على الصورة للتكبير'
				}
			],
			requiredInfo: [
				'رقم الموبايل اللي حولت منه 📲',
				'سكرين شوت بالتحويل 🖼',
				'وقت وتاريخ التحويل ⏳'
			],
			whatsappNumber: '201554843745',
			subscriptionWarnings: {
				refund: {
					title: 'سياسة الاسترداد',
					points: [
						'⚠️ لا يوجد استرداد أو سحب للاشتراك نهائيًا لأي سبب من الأسباب.'
					]
				},
				validity: {
					title: 'مدة صلاحية الاشتراك:',
					points: [
						'المنصة شغالة لغاية اخر القسط الاول فقط',
						'مع إنتهاء القسط الاول المحتوى بيقفل تلقائي',
						'عند التجديد بيتفتح لك كل المحتوى من الأول',
						'في خطة الدفع الكامل المنصة بتفضل شغالة لحد ليالي الامتحان'
					]
				}
			},
			subtitle: 'مراجعات جروبات A و B و C — دفعة 2026'
		}
	},
	'subscription-intensive': {
		isEnrollmentClosed: true,
		enrollmentReopenMessage: 'انتظروا التفاصيل قريباً بإذن الله 🔥',
		subscriptionDetails: {
			title: 'الاشتراك المكثف',
			subtitle: 'كورس مكثف لكلية الهندسة - دفعة 2026',
			googleFormLink: 'https://forms.gle/CA4CshRiJgR6zUgH9',
			paymentPlans: {
				installments: {
					label: 'الدفع على قسطين',
					installment1: { amount: '2200', label: 'القسط الأول', note: 'وقت الاشتراك' },
					installment2: { amount: '1600', label: 'القسط الثاني', note: 'ابتداءً من 7 أغسطس' },
					total: '3800'
				},
				full: {
					label: 'الدفع كاملًا',
					amount: '3500',
					originalAmount: '3800',
					saving: '300'
				}
			},
			currency: 'ج',
			vodafoneNumbers: [
				{ number: '01036744561', owner: '***Omneya S** S' }
			],
			requiredInfo: [
				'رقم الموبايل اللي حولت منه 📲',
				'سكرين شوت بالتحويل 🖼',
				'وقت وتاريخ التحويل ⏳'
			],
			whatsappNumber: '201554843745',
			subscriptionWarnings: {
				refund: {
					title: 'سياسة الاسترداد:',
					points: [
						'لا يوجد استرداد أو سحب للاشتراك نهائيًا لأي سبب من الأسباب'
					]
				},
				validity: {
					title: 'مدة صلاحية الاشتراك:',
					points: [
						'المنصة شغالة لغاية اخر القسط الاول فقط',
						'مع إنتهاء القسط الاول المحتوى بيقفل تلقائي',
						'عند التجديد بيتفتح لك كل المحتوى من الأول',
						'في خطة الدفع الكامل المنصة بتفضل شغالة لحد ليالي الامتحان'
					]
				}
			}
		}
	}
} as const;
