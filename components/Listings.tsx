// components/Listings.tsx
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ListingTranslationType } from '@/data/translations/types';
import { useTranslatedContent } from '@/hooks/useTranslatedContent';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const imageMapping: Record<string, any> = {
    "blanco.png": require("@/assets/images/blanco.png"),
    "punta-amarilla.png": require("@/assets/images/punta-amarilla.png"),
    "amarillo.png": require("@/assets/images/amarillo.png"),
    "punta-verde.png": require("@/assets/images/punta-verde.png"),
    "verde.png": require("@/assets/images/verde.png"),
    "punta-azul.png": require("@/assets/images/punta-azul.png"),
    "azul.png": require("@/assets/images/azul.png"),
    "punta-roja.png": require("@/assets/images/punta-roja.png"),
    "rojo.png": require("@/assets/images/rojo.png"),
    "punta-negra.png": require("@/assets/images/punta-negra.png"),
    "shinewavemovement.png": require("@/assets/images/shinewavemovement.png"),
    "chariotFeet.png": require("@/assets/images/chariotFeet.png"),
    "default.png": require("@/assets/images/default.png"),
    "annunFeet.png": require("@/assets/images/annunFeet.png"),
    "sajuchiruji.png": require("@/assets/images/sajuchiruji.png"),
    "defensaBaja.png": require("@/assets/images/defensaBaja.png"),
    "defensaMedia.png": require("@/assets/images/defensaMedia.png"),
    "defensaBajaManoAbrierta.png": require("@/assets/images/defensaBajaManoAbrierta.png"),
    "apchagui.png": require("@/assets/images/apchagui.png"),
    "1_chonji.png": require("@/assets/images/1_chonji.png"),
    "2_dangun.png": require("@/assets/images/2_dangun.png"),
    "3_dosan.png": require("@/assets/images/3_dosan.png"),
    "DO-SAN.jpg": require("@/assets/images/DO-SAN.jpg"),
    "1erlogoitf.png": require("@/assets/images/1erlogoitf.png"),
    "4_wonhyo.png": require("@/assets/images/4_wonhyo.png"),
    "WON-HYO.jpg": require("@/assets/images/WON-HYO.jpg"),
    "5_yulguk.png": require("@/assets/images/5_yulguk.png"),
    "YUL-GOK.jpg": require("@/assets/images/YUL-GOK.jpg"),
    "6_joonggun.png": require("@/assets/images/6_joonggun.png"),
    "JOONG-GUN.jpg": require("@/assets/images/JOONG-GUN.jpg"),
    "7_toigye.png": require("@/assets/images/7_toigye.png"),
    "TOI-GYE.jpg": require("@/assets/images/TOI-GYE.jpg"),
    "8_hwarang.png": require("@/assets/images/8_hwarang.png"),
    "HWA-RANG.jpg": require("@/assets/images/HWA-RANG.jpg"),
    "9_choongmoo.png": require("@/assets/images/9_choongmoo.png"),
    "CHOONG-MOO.jpg": require("@/assets/images/CHOONG-MOO.jpg"),
    "tkd.png": require("@/assets/images/tkd.png"),
    "courtesy.png": require("@/assets/images/courtesy.png"),
    "integrity.png": require("@/assets/images/integrity.png"),
    "perseverance.png": require("@/assets/images/perseverance.png"),
    "selfcontrol.png": require("@/assets/images/selfcontrol.png"),
    "indomitablespirit.png": require("@/assets/images/indomitablespirit.png"),
    "history.png": require("@/assets/images/history.png"),
    "combate.png": require("@/assets/images/combate.png"),
    "1erDAN.png": require("@/assets/images/1erDAN.png"),
    "2doDAN.png": require("@/assets/images/2doDAN.png"),
    "3erDAN.png": require("@/assets/images/3erDAN.png"),
    "4toDAN.png": require("@/assets/images/4toDAN.png"),
    "5toDAN.png": require("@/assets/images/5toDAN.png"),
    "6toDAN.png": require("@/assets/images/6toDAN.png"),
    "10_kwanggae.png": require("@/assets/images/10_kwanggae.png"),
    "KWANG-GAE.jpg": require("@/assets/images/KWANG-GAE.jpg"),
    "PO-EUN.jpg": require("@/assets/images/PO-EUN.jpg"),
    "GE-BAEK.jpg": require("@/assets/images/GE-BAEK.jpg"),
    "EUI-AM.jpg": require("@/assets/images/EUI-AM.jpg"),
    "CHOONG-JANG.jpg": require("@/assets/images/CHOONG-JANG.jpg"),
    "JUCHE.jpg": require("@/assets/images/JUCHE.jpg"),
    "SAM-IL.jpg": require("@/assets/images/SAM-IL.jpg"),
    "YOO-SIN.jpg": require("@/assets/images/YOO-SIN.jpg"),
    "CHOI-YONG.jpg": require("@/assets/images/CHOI-YONG.jpg"),
    "YON-GAE.jpg": require("@/assets/images/YON-GAE.jpg"),
    "UL-JI.jpg": require("@/assets/images/UL-JI.jpg"),
    "MOON-MOO.jpg": require("@/assets/images/MOON-MOO.jpg"),
    "SO-SAN.jpg": require("@/assets/images/SO-SAN.jpg"),
    "SE-JONG.jpg": require("@/assets/images/SE-JONG.jpg"),
    "TONG-IL.jpg": require("@/assets/images/TONG-IL.jpg"),
    "ITF_Patterns_Poster_LowRes.png": require("@/assets/images/ITF_Patterns_Poster_LowRes.png"),
    "powerbrake2.png": require("@/assets/images/powerbrake2.png"),    
    "powerbrake.jpg": require("@/assets/images/powerbrake.jpg"),
    "tul.png": require("@/assets/images/tul.png"),
    "sparring.jpg": require("@/assets/images/sparring.jpg"),
    "carta.jpg": require("@/assets/images/carta.jpg"),
    "moral3.png": require("@/assets/images/moral3.png"),
    "culturamoral.png": require("@/assets/images/culturamoral.png"),
    
};

interface ListingsProps {
    category: string;
    listings?: ListingTranslationType[];
}

const Listings: React.FC<ListingsProps> = ({ category, listings = [] }) => {
    const { t } = useTranslation();
    const { content } = useTranslatedContent();

    // Use provided listings or content from useTranslatedContent
    const dataSource = listings.length > 0 ? listings : content;

    const filteredContent = React.useMemo(() => {
        if (category === 'Todos') {
            return dataSource;
        }
        return dataSource.filter(item => item.category === category);
    }, [category, dataSource]);

    const getImageSource = (imageName: string) => {
        if (imageName.startsWith('http')) {
            return { uri: imageName };
        }
        return imageMapping[imageName] || imageMapping['default.png'];
    };

    const renderItem = ({ item }: { item: ListingTranslationType }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity style={styles.listing}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={getImageSource(item.image)}
                        style={styles.image}
                    />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredContent}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContainer: {
        padding: 10,
        paddingBottom: 100,
    },
    listing: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    details: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primaryColor,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default Listings;